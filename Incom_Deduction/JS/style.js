const inputs = document.querySelectorAll('input[type="text"]');
const creditDiv = document.getElementById('credit');
const checkDiv = document.getElementById('check');
const totalUseDiv = document.getElementById('totalUse');
const annualSalary25Div = document.getElementById("annual-salary's_25%");
const creditMinusAnnualSalaryDiv = document.getElementById("creditMinusAnnualSalary");
const creditMinusAnnualSalary15PercentDiv = document.getElementById("creditMinusAnnualSalary15Percent");
const check15PercentDiv = document.getElementById("check15Percent");
const creditCheckTotalDeductionDiv = document.getElementById("creditCheckTotalDeduction"); // 추가

// 연봉 입력 필드에 입력이 일어날 때마다 최대 공제 금액을 조절하는 함수
document.getElementById('annual-salary').addEventListener('input', function () {
    const annualSalary = parseFloat(this.value.replace(/,/g, ''));

    // 연봉이 70000000 이하인 경우 최대 공제 금액을 3000000으로 설정
    // 연봉이 70000000 초과인 경우 최대 공제 금액을 2500000으로 설정
    const maxDeduction = annualSalary <= 70000000 ? 3000000 : 2500000;

    // 최대 공제 금액을 표시하는 div 업데이트
    creditCheckTotalDeductionDiv.textContent = '최대: ' + addCommas(maxDeduction.toFixed(0)) + ' 원';
});

// 로컬 스토리지에서 값 불러오기
window.addEventListener('load', function () {
    inputs.forEach(input => {
        const storedValue = localStorage.getItem(input.id);
        if (storedValue) {
            input.value = storedValue;
        }
    });
    calculateCreditTotal();
    calculateCheckTotal();
    calculateTotalUse();
    calculateAnnualSalary25Percent();
    calculateCreditMinusAnnualSalary();
    calculateCreditMinusAnnualSalary15Percent();
    calculateCheck15Percent();
    calculateCreditCheckTotalDeduction(); // 추가
});

// 입력 필드에 입력이 일어날 때마다 값 저장하기
inputs.forEach(input => {
    input.addEventListener('input', function () {
        let value = this.value.replace(/,/g, '');
        this.value = addCommas(value);
        localStorage.setItem(this.id, this.value); // 값 저장
        calculateCreditTotal();
        calculateCheckTotal();
        calculateTotalUse();
        calculateAnnualSalary25Percent();
        calculateCreditMinusAnnualSalary();
        calculateCreditMinusAnnualSalary15Percent();
        calculateCheck15Percent();
        calculateCreditCheckTotalDeduction(); // 추가
    });
});

// 숫자 입력 시 세 자리수마다 쉼표를 찍어주는 함수
function addCommas(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Clear All 버튼 클릭 시 모든 입력 필드 초기화 및 로컬 스토리지에서 값 제거
function clearAllInputs() {
    inputs.forEach(input => {
        input.value = '';
        localStorage.removeItem(input.id); // 값 제거
    });
    creditDiv.textContent = ''; // credit div 내용 지우기
    checkDiv.textContent = ''; // check div 내용 지우기
    totalUseDiv.textContent = ''; // totalUse div 내용 지우기
    annualSalary25Div.textContent = ''; // annual-salary's_25% div 내용 지우기
    creditMinusAnnualSalaryDiv.textContent = ''; // creditMinusAnnualSalary div 내용 지우기
    creditMinusAnnualSalary15PercentDiv.textContent = ''; // creditMinusAnnualSalary15Percent div 내용 지우기
    check15PercentDiv.textContent = ''; // check15Percent div 내용 지우기
    creditCheckTotalDeductionDiv.textContent = ''; // creditCheckTotalDeduction div 내용 지우기
}

// 입력 필드에 입력이 일어날 때마다 숫자 이외의 입력을 무시하는 이벤트 처리
inputs.forEach(input => {
    input.addEventListener('input', function () {
        let numericValue = this.value.replace(/[^0-9]/g, '');
        this.value = addCommas(numericValue);
    });
});

// "credit" div에 신용카드 사용내역 총합을 계산하여 표시하는 함수
function calculateCreditTotal() {
    let creditTotal = 0;
    document.querySelectorAll('.month-input-Credit').forEach(input => {
        let value = input.value.replace(/,/g, '');
        if (value !== '') {
            creditTotal += parseInt(value);
        }
    });
    creditDiv.textContent = '신용카드 사용내역 총합: ' + addCommas(creditTotal) + ' 원';
}

// "check" div에 체크카드 사용내역 총합을 계산하여 표시하는 함수
function calculateCheckTotal() {
    let checkTotal = 0;
    document.querySelectorAll('.month-input-Check').forEach(input => {
        let value = input.value.replace(/,/g, '');
        if (value !== '') {
            checkTotal += parseInt(value);
        }
    });
    checkDiv.textContent = '체크카드 사용내역 총합: ' + addCommas(checkTotal) + ' 원';
}

// "credit"과 "check" 합산한 값 표시하는 함수
function calculateTotalUse() {
    let totalCredit = 0;
    let totalCheck = 0;

    document.querySelectorAll('.month-input-Credit').forEach(input => {
        let value = input.value.replace(/,/g, '');
        if (value !== '') {
            totalCredit += parseInt(value);
        }
    });

    document.querySelectorAll('.month-input-Check').forEach(input => {
        let value = input.value.replace(/,/g, '');
        if (value !== '') {
            totalCheck += parseInt(value);
        }
    });

    totalUseDiv.textContent = '총 사용액: ' + addCommas(totalCredit + totalCheck) + ' 원';
}

// 연봉의 25% 계산하여 표시하는 함수
function calculateAnnualSalary25Percent() {
    const annualSalaryInput = document.getElementById('annual-salary');
    const annualSalary = parseFloat(annualSalaryInput.value.replace(/,/g, ''));
    const salary25Percent = annualSalary * 0.25;
    annualSalary25Div.textContent = '연봉의 25%: ' + addCommas(salary25Percent.toFixed(0)) + ' 원';
}

// "creditMinusAnnualSalary" 값의 표시 및 음수 처리
function calculateCreditMinusAnnualSalary() {
    const annualSalaryInput = document.getElementById('annual-salary');
    const annualSalary = parseFloat(annualSalaryInput.value.replace(/,/g, ''));
    let creditTotal = 0;
    document.querySelectorAll('.month-input-Credit').forEach(input => {
        let value = input.value.replace(/,/g, '');
        if (value !== '') {
            creditTotal += parseInt(value);
        }
    });
    const creditMinusSalary = creditTotal - (annualSalary * 0.25);
    const creditMinusAnnualSalaryDiv = document.getElementById("creditMinusAnnualSalary");
    if (creditMinusSalary < 0) {
        creditMinusAnnualSalaryDiv.style.color = "red";
        creditMinusAnnualSalaryDiv.textContent = '신용카드 공제가능 금액: 0 원 (A - B)';
    } else {
        creditMinusAnnualSalaryDiv.style.color = ""; // Reset color to default
        creditMinusAnnualSalaryDiv.textContent = '신용카드 공제가능 금액: ' + addCommas(creditMinusSalary.toFixed(0)) + ' 원 (A - B)';
    }
}

// "creditMinusAnnualSalary" 값의 15%를 계산하여 표시하는 함수
function calculateCreditMinusAnnualSalary15Percent() {
    const creditMinusAnnualSalary = parseFloat(creditMinusAnnualSalaryDiv.textContent.replace(/[^\d.-]/g, ''));
    const creditMinusAnnualSalary15Percent = creditMinusAnnualSalary * 0.15;
    creditMinusAnnualSalary15PercentDiv.textContent = '신용카드 공제 15%: ' + addCommas(creditMinusAnnualSalary15Percent.toFixed(0)) + ' 원 (C의 15%)';
}

// "check" 값의 30%를 계산하여 표시하는 함수
function calculateCheck15Percent() {
    let checkTotal = 0;
    document.querySelectorAll('.month-input-Check').forEach(input => {
        let value = input.value.replace(/,/g, '');
        if (value !== '') {
            checkTotal += parseInt(value);
        }
    });
    const check15Percent = checkTotal * 0.3;
    check15PercentDiv.textContent = '체크카드 공제 30%: ' + addCommas(check15Percent.toFixed(0)) + ' 원';
}

// "creditMinusAnnualSalary15Percent"와 "check15Percent"를 합산하여 "creditCheckTotalDeduction"에 표시하는 함수
function calculateCreditCheckTotalDeduction() {
    const annualSalaryInput = document.getElementById('annual-salary');
    const annualSalary = parseFloat(annualSalaryInput.value.replace(/,/g, ''));
    const maxDeduction = annualSalary <= 70000000 ? 3000000 : 2500000;

    const creditMinusAnnualSalary = parseFloat(creditMinusAnnualSalaryDiv.textContent.replace(/[^\d.-]/g, ''));
    const creditMinusAnnualSalary15Percent = creditMinusAnnualSalary * 0.15;

    let checkTotal = 0;
    document.querySelectorAll('.month-input-Check').forEach(input => {
        let value = input.value.replace(/,/g, '');
        if (value !== '') {
            checkTotal += parseInt(value);
        }
    });
    const check15Percent = checkTotal * 0.3;

    const totalDeduction = creditMinusAnnualSalary15Percent + check15Percent;
    const finalDeduction = totalDeduction > maxDeduction ? maxDeduction : totalDeduction;

    if (totalDeduction > maxDeduction) {
        displayLimitExceededModal(); // 공제한도 초과 시 모달 표시
    }

    document.getElementById('creditCheckTotalDeduction').textContent = '총 공제 금액: ' + addCommas(finalDeduction.toFixed(0)) + ' 원 (최대: ' + addCommas(maxDeduction.toFixed(0)) + ' 원)';
}