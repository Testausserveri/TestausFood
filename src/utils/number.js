export const averageNumber = (numbers = []) => {
    if (numbers.length === 0) return 0;
    let total = 0;
    numbers.forEach(i=>total+=i)
    return Math.round((total/numbers.length) * 10) / 10;
}