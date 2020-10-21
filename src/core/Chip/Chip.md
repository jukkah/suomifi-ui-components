```js
import { Chip } from 'suomifi-ui-components';

const removeAction = () => {
  alert('Selection removed');
};

<>
  <div>
    <Chip
      removable
      actionLabel="Deselect"
      onClick={removeAction}
      style={{ marginRight: '10px' }}
    >
      Removable chip 1
    </Chip>

    <Chip removable actionLabel="Deselect" onClick={removeAction}>
      Removable chip 2
    </Chip>
  </div>
  <div>
    <Chip onClick={removeAction}>
      Clickable chip without remove icon
    </Chip>
  </div>

  <Chip.static>
    Static chip with a long content that doesn't fit into the
    component's maximum width of 290px
  </Chip.static>

  <Chip.static disabled>Disabled static chip</Chip.static>
</>;
```