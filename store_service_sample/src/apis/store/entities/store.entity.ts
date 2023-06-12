import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Generated,
} from 'typeorm';

@Entity()
export class StoreInfo {
  @PrimaryGeneratedColumn('uuid', { comment: '서비스 유일코드(uuid/v4)' })
  si_service_id: string;

  @Column({ length: 20, comment: '상점 아이디' })
  si_store_id: string;

  @Column({ type: 'tinyint', unsigned: true, comment: '상점 카테고리' })
  si_category: number;

  @Column({ length: 100, comment: '대표메일' })
  si_email: string;

  @Column({ length: 200, comment: '쇼핑몰명' })
  si_name: string;

  @Column({ length: 50, comment: '대표번호' })
  si_phone: string;

  @Column({ length: 50, comment: '개인정보보호책임자' })
  si_privacy_manager: string;

  @Column({ length: 100, comment: '영업시간' })
  si_biz_hours: string;
}
