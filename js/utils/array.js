
export const range = (start, end) => {
    const result = [];
    start = +start;
    end = + end;

    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
};