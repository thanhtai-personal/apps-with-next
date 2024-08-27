import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { SxProps } from '@mui/material';

export const ListItems = ({
  items,
  sx,
  bgColor,
  itemSx,
}: {
  items: any[];
  sx?: SxProps<any>;
  itemSx?: SxProps<any>;
  bgColor?: string;
}) => {
  return (
    <List sx={sx || { width: '100%', maxWidth: 390, bgcolor: bgColor || 'transparent' }}>
      {items.map((item, index) => {
        return item.type === "divider" ? (<Divider variant="inset" component="li" />)
          : (
            <ListItem key={`list-item-${index}`} alignItems={item.alignITems || "flex-start"}
              sx={itemSx || { padding: 0 }}
            >
              {item.avatar && <ListItemAvatar>
                <Avatar alt={item.avatar.alt} src={item.avatar.src} />
              </ListItemAvatar>}
              {item.texts && <ListItemText
                primary={item.texts.primary}
                secondary={item.texts.secondary}
              />}
              {item.renderItem && item.renderItem(item)}
            </ListItem>
          )
      })}
    </List>
  );
}
