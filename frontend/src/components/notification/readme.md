## Описание параметров для вызова нотификации
```typescript
interface INotificationOptions {
  // обязательные параметры
  message: string; // ОБЯЗАТЕЛЬНО для ВСЕХ типов
  button: IButtonData; // ОБЯЗАТЕЛЬНО ТОЛЬКО для type === 'alert'
  buttons: IButtonData[]; // ОБЯЗАТЕЛЬНО ТОЛЬКО для type === 'confirm'

  // НЕ обязательные параметры
  level?: TNotificationLevel; // влияет на цвет нотификации
  lifeTime?: number; // время жизни (по умолчанию 8 секунд)
  immortal?: boolean; // если true, то нотификация будет "видна" пока пользователь ее не закроет
  hasCloseButton?: boolean; // показывать или нет кнопку закрытия нотификации
  type?: TNotificationType; // тип нотификации, по-умолчанию type = message
  id?: string; // все id должны быть уникальными
}

type TNotificationLevel = 'success' | 'warning' | 'error' | 'info';
type TNotificationType = 'message' | 'alert' | 'confirm';
type TButtonType = 'primary' | 'secondary' | 'link';
interface IButtonData {
  label: string;
  onClick: (buttonId: string) => void;
  buttonId?: string;
  closeOnButton?: boolean;
  type?: TButtonType;
}
```

## TYPE message
 * по-умолчанию закрывается автоматически (можно изменить параметром immortal)
 * по-умолчанию закрывается через 8 секунд с момента отображения (можно изменить параметром lifeTime)
 * можно закрыть раньше если нажать на крестик в углу нотификации (можно изменить параметром hasCloseButton)
 * по-умолячанию level: 'success' (можно изменить level: TNotificationLevel)
```typescript
import { addNotificationItem, INotificationOptions }  from 'src/components/notification';

const notificationOptions: INotificationOptions = {
  message: 'Сообщение успешно отправленно!'
};

addNotificationItem(notificationOptions);
```

## TYPE alert
 * по-умолчанию НЕ закрывается самостоятельно (можно изменить параметром immortal)
 * можно закрыть раньше если нажать на крестик в углу нотификации (можно изменить параметром hasCloseButton)
 * по-умолячанию level: 'success' (можно изменить level: TNotificationLevel)
```typescript
import { addNotificationItem, INotificationOptions }  from 'src/components/notification';

const notificationOptions: INotificationOptions = {
	message: 'Сообщение успешно отправленно!',
	button: {
	  label: 'Понятно',
	  onClick: () => console.log('button clicked')
	}
};

addNotificationItem(notificationOptions);
```

## TYPE message
 * по-умолчанию НЕ закрывается самостоятельно (можно изменить параметром immortal)
 * по-умолчанию НЕЛЬЗЯ закрыть раньше (можно изменить параметром hasCloseButton)
 * по-умолячанию level: 'success' (можно изменить level: TNotificationLevel)
```typescript
import { addNotificationItem, INotificationOptions }  from 'src/components/notification';

const notificationOptions: INotificationOptions = {
	message: 'Вы точно хотите удалить документ?',
	buttons: [
		{
			label: 'Да',
			onClick: () => console.log('button ok clicked'),
			id: 'ok', // по-умполчанию рандомная строка
		},
		{
			label: 'Отмена',
			onClick: () => console.log('button cancel clicked'),
			id: 'cancel', // по-умполчанию рандомная строка
		},
	]
};

addNotificationItem(notificationOptions);
```

## Пример использования:

#### application.tsx
```javascript
import React from 'react';
import Notification  from 'src/components/notification';

function Application() {
  return (
    <div className="application">
    	<div className="layout">
    		//...
    	</div>
    	<Notification isMobile={false} maxShowItems={6} />
    </div>
  )
}
```

#### some-component.tsx
```javascript
import React from 'react';
import { addNotificationItem }  from 'src/components/notification';

function MainPage() {
  const onClick = () => {
    addNotificationItem({
    	message: 'notification type message'
    });
  };

  return (
    <div className="main-page" onClick={onClick}>
    	<div className="button">click me</div>
    </div>
  )
}
```
