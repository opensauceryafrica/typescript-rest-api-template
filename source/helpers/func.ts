import crypto from 'crypto';
import path from 'path';
import env from '../config/env';
import * as factoryRepository from '../repository/factory';

export function firstCharToUpperCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertToSentenceCase(str: string): string {
    return str
        .split(' ')
        .map((word) => firstCharToUpperCase(word))
        .join(' ');
}

export function sortDirection(direction: string): 1 | -1 | 0 {
    return !direction ? 0 : direction.toLowerCase() === 'asc' ? 1 : direction.toLowerCase() === 'desc' ? -1 : 0;
}

export function generateRandomString(length: number, uppercase = false): string {
    return uppercase
        ? crypto.randomBytes(length).toString('hex').toUpperCase()
        : crypto.randomBytes(length).toString('hex');
}

export function generateRandomNumberString(length: number): string {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
}

export function renderTemplateString(template: string, data: Record<string, any>): string {
    return template.replace(/{{([^}]+)}}/g, (_, key: string) => data[key]);
}

export function extractAttachments(attachments: Array<string>): Array<{
    filename: string;
    path: string;
}> {
    return attachments.map((attachment) => {
        return {
            filename: path.basename(attachment),
            path: attachment,
        };
    });
}

export function computeChecksum(payload: string): string {
    return crypto.createHash('sha256').update(payload).digest('hex');
}

export const generateId = async (key: string, pad = '0', length = 9): Promise<string> => {
    if (!env.cursor.current) {
        let cursor = await factoryRepository.cursor(key);
        env.cursor.current = (cursor as any)[key];
        env.cursor.pointer = (cursor as any)[key] - env.cursor.step;
    }
    if (env.cursor.pointer === env.cursor.current) {
        let cursor = await factoryRepository.cursor(key);
        env.cursor.current = (cursor as any)[key];
        env.cursor.pointer = (cursor as any)[key] - env.cursor.step;
    }
    env.cursor.pointer += 1;
    return `${key.toUpperCase()}${env.cursor.pointer.toString().padStart(length, pad)}`;
};

export function extractToken(text: string): string | null {
    const tokenRegex = /Token:\s*((?:[\d-]+\s*)+)/;
    const match = text?.match(tokenRegex);
    if (match && match[1]) {
        // Remove any spaces from the token before returning it
        return match[1].replace(/\s+/g, '');
    } else {
        return null;
    }
}

export function withinUTCP1TimeRangeAndDays(actionTime: Date, startTime: string, endTime: string, days: number[]) {
    // Parse the configured time range (in UTC+1)
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    // Convert the action time to UTC+1
    const actionDate = new Date(actionTime);
    const utcPlus1Offset = 60; // UTC+1 is 60 minutes ahead of UTC
    const actionUTCP1 = new Date(actionDate.getTime() + utcPlus1Offset * 60 * 1000);

    // Extract hours and minutes in UTC+1
    const actionHour = actionUTCP1.getUTCHours();
    const actionMinute = actionUTCP1.getUTCMinutes();

    // Convert the action time to total minutes since midnight
    const actionTotalMinutes = actionHour * 60 + actionMinute;

    // Convert the configured range to total minutes since midnight
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    // Check if the time range spans midnight
    const isRangeSpanningMidnight = endTotalMinutes < startTotalMinutes;

    // Check if the action time is within the range (inclusive)
    let isWithinTimeRange;
    if (isRangeSpanningMidnight) {
        // Handle the case where the range spans midnight
        isWithinTimeRange = actionTotalMinutes >= startTotalMinutes || actionTotalMinutes <= endTotalMinutes;
    } else {
        // Handle the case where the range does not span midnight
        isWithinTimeRange = actionTotalMinutes >= startTotalMinutes && actionTotalMinutes <= endTotalMinutes;
    }

    // Get the day of the week in UTC+1 (0 = Sunday, 6 = Saturday)
    let actionDay = actionUTCP1.getUTCDay();

    // Adjust the day if the action time is after midnight but within the range
    if (isRangeSpanningMidnight && actionTotalMinutes <= endTotalMinutes) {
        // Subtract 1 day to check the previous day
        actionDay = (actionDay - 1 + 7) % 7; // Handle wrap-around for Sunday (0 - 1 = 6)
    }

    // Check if the action day is in the allowed days array
    const isAllowedDay = days.includes(actionDay);

    // Return true only if both conditions are met
    return isWithinTimeRange && isAllowedDay;
}
