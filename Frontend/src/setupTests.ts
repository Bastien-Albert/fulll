import '@testing-library/jest-dom';

class IntersectionObserverMock implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    constructor(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _callback: IntersectionObserverCallback,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _options?: IntersectionObserverInit
    ) {}

    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
});


