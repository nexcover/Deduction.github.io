// 최대 공제 금액 초과 시 모달 표시
function displayLimitExceededModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "block";

    // 닫기 버튼에 대한 이벤트 처리
    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}
