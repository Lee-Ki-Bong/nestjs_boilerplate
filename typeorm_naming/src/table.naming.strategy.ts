import { NamingStrategyInterface, DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class TableNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  private tbName: string;
  tableName(className: string, customName: string): string {
    const tbName = customName ? customName : snakeCase(className);
    this.tbName = tbName;
    return `${tbName}_tb`;
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      `${this.tbName[0]}_` + (customName ? customName : snakeCase(propertyName))
    );
  }

  relationName(propertyName: string): string {
    return `${this.tbName[0]}_` + snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return (
      `${this.tbName[0]}_` +
      `${relationName[0]}_` +
      snakeCase(referencedColumnName)
    );
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ): string {
    return (
      snakeCase(
        firstTableName +
          '_' +
          firstPropertyName.replace(/\./gi, '_') +
          '_' +
          secondTableName,
      ) + '_tb'
    );
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(
      tableName + '_' + (columnName ? columnName : propertyName),
    );
  }

  classTableInheritanceParentColumnName(
    parentTableName: any,
    parentTableIdPropertyName: any,
  ): string {
    return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
  }
}
