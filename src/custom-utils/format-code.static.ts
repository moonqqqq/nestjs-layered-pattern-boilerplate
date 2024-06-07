export default class FormatData {
  static to5Degits(value: number) {
    // 최대 자릿수 지정 (여기서는 5로 설정)
    const maxLength = 5;

    // 입력된 값을 문자열로 변환
    let stringValue = value.toString();

    // 부족한 자릿수만큼 0을 추가
    while (stringValue.length < maxLength) {
      stringValue = '0' + stringValue;
    }

    return stringValue;
  }

  static padZero(number: number) {
    if (number >= 0 && number <= 9) {
      return '0' + number;
    }
    return number.toString();
  }
}
