import thumbnailimg from '../images/thumbnail.jpg';
import { categoryList, distanceList } from './gatheringKeyword';

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
    deadlineDate: '24.10.31',
    description:
      '안녕하세요. 런닝을 사랑하는 사람들을 위한 모임입니다. 함께 달리실 분들은 모두 환영입니다. 안녕하세요. 런닝을 사랑하는 사람들을 위한 모임입니다. 함께 달리실 분들은 모두 환영입니다. 안녕하세요. 런닝을 사랑하는 사람들을 위한 모임입니다. 함께 달리실 분들은 모두 환영입니다. 안녕하세요. 런닝을 사랑하는 사람들을 위한 모임입니다. 함께 달리실 분들은 모두 환영입니다.',
    profile: '',
    name: '방장이름',
    members: ['이름', '이름', '이름', '이름', '이름', '이름']
  });
}
