import { IconProps } from "@/types/icons";

const DocumentIcon = ({ isActive, width, height }: IconProps) => {
  const containerStyle: Partial<IconProps> = {};

  if (width) containerStyle.width = width;
  if (height) containerStyle.height = height;

  if (isActive)
    return (
      <div style={containerStyle}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M13.191 0H4.81C1.77 0 0 1.78 0 4.83V15.16C0 18.26 1.77 20 4.81 20H13.191C16.28 20 18 18.26 18 15.16V4.83C18 1.78 16.28 0 13.191 0Z"
            fill="#554AF0"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.08001 4.64999V4.65999C4.64901 4.65999 4.30001 5.00999 4.30001 5.43999C4.30001 5.86999 4.64901 6.21999 5.08001 6.21999H8.06901C8.50001 6.21999 8.85001 5.86999 8.85001 5.42899C8.85001 4.99999 8.50001 4.64999 8.06901 4.64999H5.08001ZM12.92 10.74H5.08001C4.64901 10.74 4.30001 10.39 4.30001 9.95999C4.30001 9.52999 4.64901 9.17899 5.08001 9.17899H12.92C13.35 9.17899 13.7 9.52999 13.7 9.95999C13.7 10.39 13.35 10.74 12.92 10.74ZM12.92 15.31H5.08001C4.78001 15.35 4.49001 15.2 4.33001 14.95C4.17001 14.69 4.17001 14.36 4.33001 14.11C4.49001 13.85 4.78001 13.71 5.08001 13.74H12.92C13.319 13.78 13.62 14.12 13.62 14.53C13.62 14.929 13.319 15.27 12.92 15.31Z"
            fill="#554AF0"
          />
        </svg>
      </div>
    );

  return (
    <div style={containerStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.7162 14.2234H5.4962"
          stroke="#686777"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.7162 10.0369H5.4962"
          stroke="#686777"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.25129 5.86011H5.49629"
          stroke="#686777"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.9086 0.749817C12.9086 0.749817 5.23159 0.753817 5.21959 0.753817C2.45959 0.770817 0.750595 2.58682 0.750595 5.35682V14.5528C0.750595 17.3368 2.4726 19.1598 5.2566 19.1598C5.2566 19.1598 12.9326 19.1568 12.9456 19.1568C15.7056 19.1398 17.4156 17.3228 17.4156 14.5528V5.35682C17.4156 2.57282 15.6926 0.749817 12.9086 0.749817Z"
          stroke="#686777"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default DocumentIcon;
