import Svg, { Path } from 'react-native-svg';

const MenuIcon = ({ width, height, fill }) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        d="M19 14C19.5523 14 20 14.4477 20 15C20 15.5523 19.5523 16 19 16H1C0.447715 16 0 15.5523 0 15C0 14.4477 0.447715 14 1 14H19ZM19 7C19.5523 7 20 7.44772 20 8C20 8.55228 19.5523 9 19 9H1C0.447715 9 0 8.55228 0 8C0 7.44772 0.447715 7 1 7H19ZM19 0C19.5523 0 20 0.447715 20 1C20 1.55228 19.5523 2 19 2H1C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0H19Z"
        fill={fill}
      />
    </Svg>
  );
};

export default MenuIcon;
