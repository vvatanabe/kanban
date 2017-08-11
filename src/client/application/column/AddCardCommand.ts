export interface AddCardCommand {
    readonly summary?: string;
    readonly description?: string;
    readonly startDate?: string;
    readonly dueDate?: string;
    readonly estimatedHours?: number;
    readonly actualHours?: number;
    readonly point?: number;
    readonly editing?: boolean;
}