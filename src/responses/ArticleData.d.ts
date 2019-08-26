import { NodeData } from './NodeData';
import { Status } from '../entities/Article';

export interface ArticleData extends NodeData {
    status: Status;
    version: number;
    creationTime: string;
    updateTime: string;
}
