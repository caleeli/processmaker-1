export default class DateFormatter {
    private locale: string;

    constructor(locale: string = 'en-US') {
        this.locale = locale;
    }

    // Method to format a given date according to the locale
    formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: '2-digit',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        };
        return new Intl.DateTimeFormat(this.locale, { ...defaultOptions, ...options }).format(date);
    }

    // Method to get a human-readable difference from the current time
    timeAgo(date: Date): string {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSeconds = Math.floor(diffMs / 1000);

        if (diffSeconds < 60) {
            return `${diffSeconds} seconds ago`;
        } else if (diffSeconds < 3600) {
            const minutes = Math.floor(diffSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffSeconds < 86400) {
            const hours = Math.floor(diffSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    }

    // instance of the class
    static instance = new DateFormatter();
}
