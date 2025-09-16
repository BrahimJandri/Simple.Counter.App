// CounterApp.ts
var CounterApp = /** @class */ (function () {
    function CounterApp() {
        this.count = 0;
        this.totalClicks = 0;
        this.maxValue = 0;
        this.minValue = 0;
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }
    CounterApp.prototype.initializeElements = function () {
        this.counterDisplay = document.getElementById('counter');
        this.incrementBtn = document.getElementById('incrementBtn');
        this.decrementBtn = document.getElementById('decrementBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.totalClicksDisplay = document.getElementById('totalClicks');
        this.maxValueDisplay = document.getElementById('maxValue');
        this.minValueDisplay = document.getElementById('minValue');
    };
    CounterApp.prototype.bindEvents = function () {
        var _this = this;
        this.incrementBtn.addEventListener('click', function () { return _this.increment(); });
        this.decrementBtn.addEventListener('click', function () { return _this.decrement(); });
        this.resetBtn.addEventListener('click', function () { return _this.reset(); });
        document.addEventListener('keydown', function (e) {
            switch (e.key) {
                case 'ArrowUp':
                case '+':
                    e.preventDefault();
                    _this.increment();
                    break;
                case 'ArrowDown':
                case '-':
                    e.preventDefault();
                    _this.decrement();
                    break;
                case 'r':
                case 'R':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        _this.reset();
                    }
                    break;
            }
        });
    };
    CounterApp.prototype.increment = function () {
        this.count++;
        this.totalClicks++;
        this.updateStats();
        this.updateDisplay();
        this.animateButton(this.incrementBtn, 'bg-green-600');
        this.animateCounter('increment');
    };
    CounterApp.prototype.decrement = function () {
        this.count--;
        this.totalClicks++;
        this.updateStats();
        this.updateDisplay();
        this.animateButton(this.decrementBtn, 'bg-red-600');
        this.animateCounter('decrement');
    };
    CounterApp.prototype.reset = function () {
        this.count = 0;
        this.totalClicks = 0;
        this.maxValue = 0;
        this.minValue = 0;
        this.updateDisplay();
        this.animateButton(this.resetBtn, 'bg-gray-700');
        this.animateCounter('reset');
    };
    CounterApp.prototype.updateStats = function () {
        if (this.count > this.maxValue) {
            this.maxValue = this.count;
        }
        if (this.count < this.minValue) {
            this.minValue = this.count;
        }
    };
    CounterApp.prototype.updateDisplay = function () {
        this.counterDisplay.textContent = this.count.toString();
        this.updateCounterColor();
        this.totalClicksDisplay.textContent = this.totalClicks.toString();
        this.maxValueDisplay.textContent = this.maxValue.toString();
        this.minValueDisplay.textContent = this.minValue.toString();
        this.decrementBtn.disabled = false;
    };
    CounterApp.prototype.updateCounterColor = function () {
        var counter = this.counterDisplay;
        counter.classList.remove('text-red-400', 'text-green-400', 'text-white');
        if (this.count > 0) {
            counter.classList.add('text-green-400');
        }
        else if (this.count < 0) {
            counter.classList.add('text-red-400');
        }
        else {
            counter.classList.add('text-white');
        }
    };
    CounterApp.prototype.animateButton = function (button, activeClass) {
        button.classList.add(activeClass, 'scale-95');
        setTimeout(function () {
            button.classList.remove(activeClass, 'scale-95');
        }, 150);
    };
    CounterApp.prototype.animateCounter = function (type) {
        var counter = this.counterDisplay;
        counter.classList.remove('animate-bounce-in');
        counter.offsetHeight; // force reflow
        counter.classList.add('animate-bounce-in');
        if (type === 'increment') {
            this.createFloatingText('+1', 'text-green-400');
        }
        else if (type === 'decrement') {
            this.createFloatingText('-1', 'text-red-400');
        }
        else {
            this.createFloatingText('Reset!', 'text-blue-400');
        }
    };
    CounterApp.prototype.createFloatingText = function (text, colorClass) {
        var floatingText = document.createElement('div');
        floatingText.textContent = text;
        floatingText.className = "absolute text-2xl font-bold ".concat(colorClass, " pointer-events-none transition-all duration-1000 ease-out opacity-100");
        var counterRect = this.counterDisplay.getBoundingClientRect();
        floatingText.style.left = "".concat(counterRect.left + counterRect.width / 2 - 20, "px");
        floatingText.style.top = "".concat(counterRect.top - 30, "px");
        floatingText.style.transform = 'translateY(0)';
        document.body.appendChild(floatingText);
        setTimeout(function () {
            floatingText.style.transform = 'translateY(-50px)';
            floatingText.style.opacity = '0';
        }, 100);
        setTimeout(function () {
            floatingText.remove();
        }, 1100);
    };
    // Public method to get stats with types
    CounterApp.prototype.getStats = function () {
        return {
            count: this.count,
            totalClicks: this.totalClicks,
            maxValue: this.maxValue,
            minValue: this.minValue,
        };
    };
    return CounterApp;
}());
// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
    var app = new CounterApp();
    window.counterApp = app; // type cast for debugging
    console.log('🎉 Counter App loaded successfully!');
    console.log('💡 Keyboard shortcuts: ↑ or + = Increment, ↓ or - = Decrement, Ctrl+R = Reset');
});
