const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

module.exports = class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = this.reason = undefined;
        this.unHandledCallbacks = undefined

        const handleCallback = () => {
            if (undefined === this.unHandledCallbacks) {
                return;
            }

            if (this.state === FULFILLED) {
                this.unHandledCallbacks.forEach(([onFulFilled, _]) => {
                    onFulFilled(this.value);
                })
            } else {
                this.unHandledCallbacks.forEach(([_, onRejected]) => {
                    onRejected(this.reason);
                })
            }
        }
        const resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                handleCallback();
            }
        };

        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                handleCallback();
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
            const fulFilledCallback = () => {
                if (this.state === FULFILLED && onFulfilled) {
                    try {
                        const value = onFulfilled(this.value);
                        resolve(value);
                    } catch (error) {
                        reject(error)
                    }
                }
            };

            const rejectedCallback = () => {
                if (this.state === REJECTED && onRejected) {
                    try {
                        const value = onRejected(this.reason);
                        resolve(value);
                    } catch (error) {
                        reject(error)
                    }
                }
            };

            if (this.state === PENDING) {
                if (this.unHandledCallbacks === undefined) {
                    this.unHandledCallbacks = [[fulFilledCallback, rejectedCallback]]
                }
            } else if (this.state === FULFILLED) {
                fulFilledCallback();
            } else if (this.state === REJECTED) {
                rejectedCallback();
            }
        });
    }

    catch(onRejected) {
        this.then(() => {
        }, onRejected)
    }
}
