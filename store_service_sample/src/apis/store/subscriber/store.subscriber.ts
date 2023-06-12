import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { StoreInfo } from '../entities/store.entity';

@EventSubscriber()
export class StoreInfoSubscriber
  implements EntitySubscriberInterface<StoreInfo>
{
  listenTo() {
    return StoreInfo;
  }

  beforeInsert(event: InsertEvent<StoreInfo>) {
    console.log(
      `StoreInfo ${event.entity.si_store_id} insert 를 시작하려한다.`,
    );
  }

  afterInsert(event: InsertEvent<StoreInfo>) {
    console.log(`StoreInfo ${event.entity.si_store_id} insert 를 완료되었다.`);
  }

  beforeUpdate(event: UpdateEvent<StoreInfo>) {
    // event.updatedColumns.map((col) => console.log(col.propertyName));
    console.log(
      `StoreInfo ${event.entity.si_store_id} update 를 시작하려한다.`,
    );
  }

  afterUpdate(event: UpdateEvent<StoreInfo>) {
    console.log(`StoreInfo ${event.entity.si_store_id} update 를 완료되었다.`);
  }
}
