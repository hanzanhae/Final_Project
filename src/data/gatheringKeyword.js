export const optionList = ['전체', '참여가능', '마감임박', '참여불가'];
export const distanceList = ['자유', '3km', '5km', '15km', '하프', '풀'];
export const categoryList = [
  '런린이',
  '고인물',
  '마라톤',
  '모닝런닝',
  '퇴근런닝',
  '건강'
];

// 컨셉목록
export const runningConcept = (con) => {
  switch (con) {
    case 'RUNLINI':
      return '런린이';
    case 'GOINMUL':
      return '고인물';
    case 'MARATHON':
      return '마라톤';
    case 'MORNING_RUNNING':
      return '모닝런닝';
    case 'EVENING_RUNNING':
      return '퇴근런닝';
    case 'HEALTH':
      return '건강';
    default:
      return '';
  }
};

// 거리목록
export const runningDistance = (dis) => {
  switch (dis) {
    case 'FREE':
      return '자유';
    case 'THREE_KM':
      return '3km';
    case 'FIVE_KM':
      return '5km';
    case 'FIFTEEN_KM':
      return '15km';
    case 'HALF_MARATHON':
      return '하프';
    case 'FULL_MARATHON':
      return '풀';
    default:
      return '';
  }
};
