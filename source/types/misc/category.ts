import mongoose from 'mongoose';

export interface ICategoryFilter {
    id?: string;
    search?: string;
    active?: string;
    paginate?: string;
    page?: string;
    limit?: string;
}
