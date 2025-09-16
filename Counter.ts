class Counter {
    private count: number = 0;
    private totalClicks: number = 0;
    private maxValue: number = 0;
    private minValue: number = 0;


    private counterDisplay!: HTMLElement;
    private incrementBtn!: HTMLButtonElement;
    private decrementBtn!: HTMLButtonElement;
    private resetBtn!: HTMLButtonElement;
    private totalClicksDisplay!: HTMLElement;
    private maxValueDisplay!: HTMLElement;
    private minValueDisplay!: HTMLElement;

    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }

    private initializeElements(): void {
        this.counterDisplay = document.getElementById('counter') as HTMLElement;
        this.incrementBtn = document.getElementById('incrementBtn') as HTMLButtonElement;
        this.decrementBtn = document.getElementById('decrementBtn') as HTMLButtonElement;
        this.resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
        this.totalClicksDisplay = document.getElementById('totalClicks') as HTMLElement;
        this.maxValueDisplay = document.getElementById('maxValue') as HTMLElement;
        this.minValueDisplay = document.getElementById('minValue') as HTMLElement;
    }

    private bindEvents(): void {
        this.incrementBtn.addEventListener('click', () => this.increment());
        this.decrementBtn.addEventListener('click', () => this.decrement());
        this.resetBtn.addEventListener('click', () => this.reset());

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                case '+':
                    e.preventDefault();
                    this.increment();
                    break;
                case 'ArrowDown':
                case '-':
                    e.preventDefault();
                    this.decrement();
                    break;
                case 'r':
                case 'R':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.reset();
                    }
                    break;
            }
        });
    }

    private increment(): void {
        this.count++;
        this.totalClicks++;
        this.updateStats();
        this.updateDisplay();
        this.animateButton(this.incrementBtn, 'bg-green-600');
        this.animateCounter('increment');
    }

    private decrement(): void {
        this.count--;
        this.totalClicks++;
        this.updateStats();
        this.updateDisplay();
        this.animateButton(this.decrementBtn, 'bg-red-600');
        this.animateCounter('decrement');
    }

    private reset(): void {
        this.count = 0;
        this.totalClicks = 0;
        this.maxValue = 0;
        this.minValue = 0;
        this.updateDisplay();
        this.animateButton(this.resetBtn, 'bg-gray-700');
        this.animateCounter('reset');
    }

    private updateStats(): void {
        if (this.count > this.maxValue) {
            this.maxValue = this.count;
        }
        if (this.count < this.minValue) {
            this.minValue = this.count;
        }
    }

    private updateDisplay(): void {
        this.counterDisplay.textContent = this.count.toString();
        this.updateCounterColor();
        this.totalClicksDisplay.textContent = this.totalClicks.toString();
        this.maxValueDisplay.textContent = this.maxValue.toString();
        this.minValueDisplay.textContent = this.minValue.toString();
        this.decrementBtn.disabled = false;
    }

    private updateCounterColor(): void {
        const counter = this.counterDisplay;
        counter.classList.remove('text-red-400', 'text-green-400', 'text-white');

        if (this.count > 0) {
            counter.classList.add('text-green-400');
        } else if (this.count < 0) {
            counter.classList.add('text-red-400');
        } else {
            counter.classList.add('text-white');
        }
    }

    private animateButton(button: HTMLButtonElement, activeClass: string): void {
        button.classList.add(activeClass, 'scale-95');
        setTimeout(() => {
            button.classList.remove(activeClass, 'scale-95');
        }, 150);
    }

    private animateCounter(type: 'increment' | 'decrement' | 'reset'): void {
        const counter = this.counterDisplay;
        counter.classList.remove('animate-bounce-in');
        counter.offsetHeight; // force reflow
        counter.classList.add('animate-bounce-in');

        if (type === 'increment') {
            this.createFloatingText('+1', 'text-green-400');
        } else if (type === 'decrement') {
            this.createFloatingText('-1', 'text-red-400');
        } else {
            this.createFloatingText('Reset!', 'text-blue-400');
        }
    }

    private createFloatingText(text: string, colorClass: string): void {
        const floatingText = document.createElement('div');
        floatingText.textContent = text;
        floatingText.className = `absolute text-2xl font-bold ${colorClass} pointer-events-none transition-all duration-1000 ease-out opacity-100`;

        const counterRect = this.counterDisplay.getBoundingClientRect();
        floatingText.style.left = `${counterRect.left + counterRect.width / 2 - 20}px`;
        floatingText.style.top = `${counterRect.top - 30}px`;
        floatingText.style.transform = 'translateY(0)';

        document.body.appendChild(floatingText);

        setTimeout(() => {
            floatingText.style.transform = 'translateY(-50px)';
            floatingText.style.opacity = '0';
        }, 100);

        setTimeout(() => {
            floatingText.remove();
        }, 1100);
    }

    // Public method to get stats with types
    public getStats(): { count: number; totalClicks: number; maxValue: number; minValue: number } {
        return {
            count: this.count,
            totalClicks: this.totalClicks,
            maxValue: this.maxValue,
            minValue: this.minValue,
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new Counter();
    (window as any).counter = app;
    console.log('🎉 Counter App loaded successfully!');
    console.log('💡 Keyboard shortcuts: ↑ or + = Increment, ↓ or - = Decrement, Ctrl+R = Reset');
});