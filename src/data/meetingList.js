import thumbnailimg from '../images/listThumbnail.jpg';

export const optionList = ['전체', '참여가능', '마감임박'];
export const distanceList = ['자유', '3km', '5km', '15km', '21.0975km', '42.195km'];
export const categoryList = ['런린이', '고인물', '마라톤', '모닝런닝', '퇴근런닝', '건강'];

// 임시모임리스트
export const meetingList = [];
for (let i = 1; i <= 20; i++) {
  meetingList.push({
    id: i,
    thumbNail: thumbnailimg,
    title: `방이름-${i}`,
    distance: distanceList[Math.floor(Math.random() * distanceList.length)],
    category: categoryList[Math.floor(Math.random() * categoryList.length)],
    location: '00시 00구',
    detailLocation: '00시 00구 00동, 00건물 1층 스타벅스',
    date: '24.10.16(수)',
    time: '오전 10:00',
    capacity: Math.floor(Math.random() * 10) + 1,
    deadlineDate: '10/31',
    description:
      '안녕하세요. 런닝을 사랑하는 사람들을 위한 모임입니다. 함께 달리실 분들은 모두 환영입니다. 안녕하세요. 런닝을 사랑하는 사람들을 위한 모임입니다. 함께 달리실 분들은 모두 환영입니다. 안녕하세요. 런닝을 사랑하는 사람들을 위한 모임입니다. 함께 달리실 분들은 모두 환영입니다. 안녕하세요. 런닝을 사랑하는 사람들을 위한 모임입니다. 함께 달리실 분들은 모두 환영입니다.',
    profile: '',
    name: '방장이름',
    members: ['이름', '이름', '이름', '이름', '이름', '이름']
  });
}

// 예상 데이터
// {
//   "title": "같이 마라톤 하실분?",
//   "appointed_at": "2024-11-01T10:00:00",
//   "deadline": "2024-10-30T23:59:59",
//   "location": {
//     "address_name": "서울특별시 중구 세종대로",
//     "coordinates":{
//         "x": 37.5665,
//         "y": 126.9780
//     }
//   },
//   "max_number": 10,
//   "description": "함께 즐거운 달리기를 합시다.",
//   "goal_distance": "FULL_MARATHON",
//   "concept": "MARATHON",
//     "gathering_image_urls": {
//       "thumbnail_url": "썸네일url",
//       "content_image_urls":[
//         {
//             "image_url": "이미지1 url",
//             "order": 1
//         },
//         {
//             "image_url": "이미지2 url",
//             "order": 2
//         }
//       ]
//     }
//   }
