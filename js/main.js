'use strict';

// 날짜
const dateTitle = document.querySelector('.chatting_date');

// let time = document.querySelector('.chatting_time');
let newDate = new Date();

// 타이틀 날짜 받아오기
function getDate() {
  const year = newDate.getFullYear(),
    month = newDate.getMonth(),
    date = newDate.getDate(),
    day = newDate.getDay(),
    week = new Array('일', '월', '화', '수', '목', '금', '토');

  dateTitle.innerText = `${year}년 ${month + 1}월 ${date}일 ${week[day]}요일`;
}

// 톡 시간(현재시간) 받아오기
function getTime(section) {
  const time = section.querySelector('.chatting_time');
  newDate = new Date();
  let hours = newDate.getHours(),
    minutes = newDate.getMinutes();

  if (hours > 12) {
    hours = hours - 12;
    time.innerText = `오후 ${hours < 10 ? `${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  } else {
    hours = hours ? hours : 12;
    time.innerText = `오전 ${hours < 10 ? `${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  }
}

// 질문 답변
const mainContainer = document.querySelector('.chatting_main_container');
const questionContainer = document.querySelector('.chatting_questions_list'),
  questionList = questionContainer.querySelectorAll('li');
const audio = new Audio('audio/카톡.mp3');

let newSection;

const questions = {
  birthday: '깐돌이의 생일은 언제예요??',
  place: '깐돌이는 어디서 태어났어용??',
  food: '깐돌이가 좋아하는 음식은 뭔가요!!??',
  time: '깐돌이가 좋아하는 시간은 언제죠??',
  weight: '깐돌이의 몸무게는 몇 키로인가요??',
  photo: '깐돌이 사진 좀 보여주세요ㅎㅎ',
};
const answers = {
  greethings:
    '[깐돌 고객센터] 깐돌이의 궁금한 점을 알려드립니다.<br /><br />깐돌이에 대해서 어떠한 것들이 궁금하신가요?',
  birthday: '깐돌이의 생일은<br>2007년 10월 23일날 태어났습니다.^^<br>참고로 누나 몽실이가 있습니다!',
  place: '깐돌이는 경기도 수원시 팔달구 화서동에서 이쁘게 잘 태어났습니다~ 수원견!',
  food:
    '깐돌이는 천하장사 소세지 정말 너무 좋아해요~<br>그래서 까달라고 갖고 올 때도 있고, 쌀튀밥이라는 간식도 정말 좋아한답니다.^^<br>그리고 사람음식도 엄청 좋아했는데 이제는 절대 주지 않고 있어요.',
  time:
    '깐돌이가 좋아하는 시간은 역시 산책시간이겠죠?^^<br>그리고 형아가 인형가지고 놀아줄 때도 정말 즐겁게 지칠줄 모르고 잘 놀아요!',
  weight: '깐돌이의 몸무게는 3.8kg 이에요.<br>깐돌이가 젊었을 때는 4.5kg 까지 나갔었답니다:)',
  photo1: '<img src="images/깐돌사진1.jpeg" />',
  photo2: '<img src="images/깐돌사진2.jpeg" />',
  photo3: '우리 깐돌이 정말 귀엽고 이쁘죠!?',
};

// 톡 도착시 스크롤 최하로 이동
function scrollDowun() {
  const scrollHeight = document.body.scrollHeight;
  window.scrollTo(0, scrollHeight);
}

// 나의 질문 내용
function myQuestion(question) {
  newSection = document.createElement('section');
  newSection.classList.add('chatting_me');
  mainContainer.append(newSection);
  newSection.innerHTML = `<div class="chatting_time">
      00:00
    </div>
    <div class="chatting_me_talk">
    <div class="chatting_me_talk_section">
      <p>${question}</p>
  </div>
  </div>`;
  return newSection;
}
// 깐돌이 답변
function friendsAnswer(answer) {
  newSection = document.createElement('section');
  newSection.classList.add('chatting_friend');
  mainContainer.append(newSection);
  newSection.innerHTML = `<div class="chatting_friend_image">
    <img src="images/깐돌프사.jpg" alt="profile" />
  </div>
  <div class="chatting_freind_contents">
    <div class="chatting_friend_name">
        깐돌 고객센터
    </div>
    <div class="chatting_friend_talk">
        <div class="chatting_friend_header">
            알림톡 도착
        </div>
        <div class="chatting_friend_talk_section">
            <p>${answer}</p>                        
        </div>
    </div>                
  </div>
  <div class="chatting_time">
    00:00
  </div>`;
  return newSection;
}

// 나의 톡
function iSay(question) {
  const mySection = myQuestion(question);
  getTime(mySection); //채팅 시간 실시간 받기
  scrollDowun(); //스크롤 이동
}
// 깐돌이 톡
function friendsSay(answer) {
  const friendSection = friendsAnswer(answer);
  getTime(friendSection); //채팅 시간 실간 받기
  audio.play(); //답변과 동시에 카톡알림음
  scrollDowun(); //스크롤 이동
}
// 질문 리스트 클릭시
function questionAnswer() {
  const question = this.className;

  switch (question) {
    case 'question_birthday':
      iSay(questions.birthday);
      setTimeout(friendsSay, 1000, answers.birthday);
      break;
    case 'question_birth_place':
      iSay(questions.place);
      setTimeout(friendsSay, 1000, answers.place);
      break;
    case 'question_favorite_food':
      iSay(questions.food);
      setTimeout(friendsSay, 1000, answers.food);
      break;
    case 'question_favorite_time':
      iSay(questions.time);
      setTimeout(friendsSay, 1000, answers.time);
      break;
    case 'question_weight':
      iSay(questions.weight);
      setTimeout(friendsSay, 1000, answers.weight);
      break;
    case 'question_photo':
      iSay(questions.photo);
      setTimeout(friendsSay, 1000, answers.photo1);
      setTimeout(friendsSay, 2000, answers.photo2);
      setTimeout(friendsSay, 3500, answers.photo3);
      break;
  }
}

function init() {
  getDate();
  setTimeout(friendsSay, 1000, answers.greethings);
  questionList.forEach((questionList) => questionList.addEventListener('click', questionAnswer));
}

init();
