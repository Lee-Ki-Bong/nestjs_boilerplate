import { registerAs } from '@nestjs/config';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export const winstonLoggerOptions = registerAs(
  'winstonLoggerOptions',
  (): winston.LoggerOptions => ({
    transports: [
      // DailyRotateFile 전송 객체 생성
      new DailyRotateFile({
        level: 'debug',
        filename: `./logs/${process.env.LOG_PATH}/debug-%DATE%.log`, // 로그 파일 경로 및 이름 설정
        datePattern: 'YYYY-MM-DD', // 날짜 패턴 설정
        zippedArchive: true, // 압축 아카이브 여부 설정
        maxSize: '20m', // 로그 파일 최대 크기 설정
        maxFiles: '14d', // 로그 파일 최대 보존 기간 설정
        format: winston.format.combine(
          // 로그 포맷 설정
          winston.format.timestamp(), // 타임스탬프 추가
          winston.format.json(), // JSON 형식으로 로그 저장
        ),
      }),
      // DailyRotateFile 전송 객체 생성
      new DailyRotateFile({
        level: 'error',
        filename: `./logs/${process.env.LOG_PATH}/error-%DATE%.log`, // 로그 파일 경로 및 이름 설정
        datePattern: 'YYYY-MM-DD', // 날짜 패턴 설정
        zippedArchive: false, // 압축 아카이브 여부 설정
        maxSize: '20m', // 로그 파일 최대 크기 설정
        maxFiles: '30d', // 로그 파일 최대 보존 기간 설정
        format: winston.format.combine(
          // 로그 포맷 설정
          winston.format.timestamp(), // 타임스탬프 추가
          winston.format.json(), // JSON 형식으로 로그 저장
        ),
      }),
      // 콘솔 출력 전송 객체 생성
      new winston.transports.Console({
        level: 'debug', // 로그 레벨 설정
        handleExceptions: true, // 예외 처리 여부 설정
        format: winston.format.combine(
          winston.format.colorize(), // 로그에 색상 추가
          winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), // 타임스탬프 추가
          winston.format.simple(), // 간단한 로그 형식
        ),
      }),
    ],
    exitOnError: false, // 에러 발생 시 프로세스 종료 여부 설정
  }),
);
