# 🏳️‍🌈 Kiosk

<br>

<img width="300" alt="스크린샷 2023-04-23 오후 2 53 08" src="https://user-images.githubusercontent.com/111214565/233822331-1a279e5b-ceb7-46ab-a947-72c43fdb3b41.png">
<img width="300" alt="스크린샷 2023-04-23 오후 2 53 28" src="https://user-images.githubusercontent.com/111214565/233822335-093fb0d7-fd67-4b7f-bb1a-85ee5c20e2b3.png">

<br>
<br>

## 0️⃣ 프로젝트 소개

소지금 500,000 원은 내가 쏜다! angenehms 개발자가 엄선한 맛집들의 음식들을 `바닐라 자바스크립트`로 구현한 까~알끔한 `반응형 키오스크`를 통해 맛있고! 재밌게! 주문해보자. 

<br>

## 1️⃣ 사용하기

**배포링크 : https://sg-kiosk.netlify.app/**

<br>

## 2️⃣ 주요기능

**✔️ 아무런 참고 없이 혼자 힘으로 구현해 본 리스트 페이지 넘기기 기능 : 넘기기 화살표 표시 여부에 따라 알 수 있는 이전, 다음페이지 존재여부**

**✔️ 스크린 내 개별 음식 리스트 클릭 시 결제창에 표시**

**✔️ 제한된 영역을 넘어간 리스트들을 스크롤을 통해 볼 수 있는 기능** 

**✔️ 상품 재고는 각각 총 5개! 초과 주문시 해당 아이템에 품절 표시**

**✔️ 선택된 아이템들의 수량을 스크린 내 클릭 뿐만 아니라 결제창 내에서 +, - 버튼을 통하여 조절할 수 있는 기능**

**✔️ - 버튼을 통해 주문취소 가능 : 품절기능 디자인 삭제, 결제창 리스트 내 목록 삭제 기능**

**✔️ 각종 버튼 클릭시 조건에 부합할 경우 적절한 기능시행, 조건에 부합하지 않을 경우 경고 안내문구**

**✔️ 결제시 접해볼 수 있는 영수증 기능 : 난수를 통한 주문번호 부여, 현재시각 등의 정보 표시**

<br>

## 3️⃣ 기술스택

**✔️ javascript**
<br>
**✔️ pure css**
<br>
**✔️ fetch**

<br>

## 4️⃣ 폴더구조

<br>

## 5️⃣ 리팩토링

**✔️ 버그 발견과 디버깅 과정 : 페이지 이동시 상품의 재고가 리셋되는 발견. 품절되었던 상품도 품절이 풀림. 이유는 변화된 재고량이 반영되는 데이터의 전역성이 부족했기 때문. 그래서 json 데이터 자체에 데이터의 변화를 입력 후 페이지 이동시 해당 데이터를 다시 불러오는 방식을 통해 버그 해결함.**

**✔️ 시험 배포시 클라이언트들의 렌더링 느림 이슈 제보에 따른 이미지 최적화 : 리사이징을 통해 이미지들의 용량을 줄임.**

<br>

## 6️⃣ 향후 리팩토링 고려사항

**✔️ 마지막 페이지에서 다음 페이지 넘기기 클릭 시 첫 페이지로 순환이동 기능 부여 고려 중. ( 그러나 이 기능은 이미 구현된 화살표 없어짐 기능과 상충되는 기능이기에 다른 방식을 모색해보는 중. )**

**✔️ 가나다 순과 같이 상품 특정 조건에 맞는 순서대로 정렬기능 혹은 검색기능 추가**

