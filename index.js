/**
* Написать функцию sostavChisla(massivChisel: number[], chislo: number), 
  которая бы находила все возможные комбинации чисел из massivChisel, 
  сумма которых равна chislo. При этом:
  1) massivChisel содержит, только уникальные положительные числа (> 0)
  2) в комбинации не должно быть повторений чисел
  3) все комбинации должны быть уникальными
  
  Для проверки работоспособности функции запустить runTests()
  
  @param massivChisel: number[]
  @param chislo: number[]
  @return Array<Array<number>>
*/
function sostavChisla(massivChisel, chislo) {

    let noMutation = [...massivChisel]; // Чтобы не мутировать приходящий массив
    // Удаляю из массива неуникальные числа, числа, которые больше заданного числа, и сортирую их в возрастающем порядке
    let arr = Array.from(new Set(noMutation.filter(el => el <= chislo).sort((a, b) => a - b)));

    let res = [];

    for (let i = 0; i < massivChisel.length; i++) {

        // Для оптимизации. Если цикл дошел до числа, которое больше от половины заданного числа, пропускаю его, так как в отсортированном массиве дальше идут еще большие числа, и сумма их всегда будет превышать заданное число
        if (arr[i] > Math.trunc(chislo / 2) && arr[i] !== chislo) {
            continue;
        }
        compare([arr[i]], i + 1);

        function compare(currentArr, nextIndex) {
            // Функция-рекурсия, которая принимает массив чисел и сравнивает их со следующим числом. 
            // Если их сумма меньше заданного числа, то следующее число тоже заносим в этот массив и продолжаем проверку с последующими
            // Если сумма больше заданного числа, то убираем из текущего массива и продолжаем проверку дальше
            let total = currentArr.reduce((total, el) => total + el);
            let next = (arr[nextIndex]) ? arr[nextIndex] : arr.at(-1);

            switch (true) {
                case (total === chislo):
                    // Если число равно равно заданному числу, добавляю его в результат и перехожу к следующей итерации
                    res.push([...currentArr]);
                    break;
                case (total + next === chislo):
                    // Если заданное число в сумме со следующим равно заданному числу, заношу в массив оба этих числа и проверяю: если в исходном массиве есть еще числа, продолжаю проверку, если больше нет, вызываю функцию, которая убирает последний элемент из результирующего массива и продолжает проверку со следующего
                    res.push([...currentArr, next]);
                    (arr[nextIndex + 1]) ? compare([...currentArr], nextIndex + 1) : deleteLastElement();
                    break;
                case (total + next > chislo):
                    // Если сумма текущего числа со следующим больше заданного числа, вызываю функцию, которая убирает последний элемент и продолжает проверку со следующего
                    deleteLastElement();
                    break;
                case (total + next < chislo):
                    // Если сумма текущего числа со следующим меньше заданного числа, заношу следующее число в текущий массив и, если в исходном массиве есть еще элементы, продолжаю сравнение с каждым последующим числом, иначе проверяю: если все числа были перебраны и их сумма меньше заданнного числа, то возвращаю результирующий массив, в противном случае вызываю функцию, которая убирает из текущего массива последнее число и продолжает проверку.
                    if (arr[nextIndex + 1]) {
                        compare([...currentArr, next], nextIndex + 1)
                    } else (currentArr.length === arr.length) ? res : deleteLastElement();
                default:
                    return res;
            }

            function deleteLastElement() {
                // Данная функция убирает последнее число из текущего массива и продолжает проверку от следующего от него числа.
                if (currentArr.length > 1) {
                    let last = arr.indexOf(...currentArr.splice(-1, 1));
                    compare([...currentArr], last + 1);
                }
            }
        }
    }
    return res;
}

// console.log(sostavChisla([8, 2, 3, 4, 6, 7, 1], 99));

function compareNumericArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    arr1 = [...arr1].sort();
    arr2 = [...arr2].sort();

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function compareArraysOfNumericArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let el1 of arr1) {
        if (arr2.findIndex(el2 => compareNumericArrays(el1, el2)) < 0) {
            return false;
        }
    }

    return true;
}

runTests();

function runTests() {
    const tests = [
        {
            chislo: 5,
            massivChisel: [8, 2, 3, 4, 6, 7, 1],
            result: [[2, 3], [4, 1]]
        },
        {
            chislo: 99,
            massivChisel: [8, 2, 3, 4, 6, 7, 1],
            result: []
        },
        {
            chislo: 8,
            massivChisel: [1, 2, 3, 4, 5, 6, 7, 8],
            result: [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]]
        },
        {
            chislo: 8,
            massivChisel: [7, 8, 3, 4, 5, 6, 1, 2],
            result: [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]]
        },
        {
            chislo: 15,
            massivChisel: [7, 8, 3, 4, 5, 6, 1, 2],
            result: [[1, 2, 3, 4, 5], [2, 3, 4, 6], [1, 3, 5, 6], [4, 5, 6], [1, 3, 4, 7], [1, 2, 5, 7], [3, 5, 7], [2, 6, 7], [1, 2, 4, 8], [3, 4, 8], [2, 5, 8], [1, 6, 8], [7, 8]]
        },

    ];

    let errors = 0;
    for (const test of tests) {
        let result;
        try {
            result = sostavChisla(test.massivChisel, test.chislo);

            if (!compareArraysOfNumericArrays(
                result,
                test.result)
            ) {
                errors++;
                console.log('--------------------------------------------')
                console.log("failed for test", test, "Got result", result);
            }
        } catch (e) {
            errors++;
            console.log("failed for", test, 'exception', e.message);
        }
    }

    if (errors === 0) {
        console.log('checkStringForBracects test successfuly completed');
    } else {
        console.log(`checkStringForBracects test failed with ${errors} errors`);
    }
}
