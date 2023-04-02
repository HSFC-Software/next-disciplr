import { IconProps } from "@/types/icons";

const UserIcon = ({ isActive, width, height }: IconProps) => {
  const containerStyle: Partial<IconProps> = {};

  if (width) containerStyle.width = width;
  if (height) containerStyle.height = height;

  if (isActive)
    return (
      <div style={containerStyle}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.99682 13.1746C3.68382 13.1746 -0.000183105 13.8546 -0.000183105 16.5746C-0.000183105 19.2956 3.66082 19.9996 7.99682 19.9996C12.3098 19.9996 15.9938 19.3206 15.9938 16.5996C15.9938 13.8786 12.3338 13.1746 7.99682 13.1746Z"
            fill="#6e7ac5"
          />
          <path
            opacity="0.4"
            d="M7.99683 10.5837C10.9348 10.5837 13.2888 8.22869 13.2888 5.29169C13.2888 2.35469 10.9348 -0.000305176 7.99683 -0.000305176C5.05983 -0.000305176 2.70483 2.35469 2.70483 5.29169C2.70483 8.22869 5.05983 10.5837 7.99683 10.5837Z"
            fill="#6e7ac5"
          />
        </svg>
      </div>
    );

  return (
    <div style={containerStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.98475 13.3462C4.11713 13.3462 0.81427 13.931 0.81427 16.2729C0.81427 18.6148 4.09617 19.2205 7.98475 19.2205C11.8524 19.2205 15.1543 18.6348 15.1543 16.2938C15.1543 13.9529 11.8733 13.3462 7.98475 13.3462Z"
          stroke="#686777"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.98477 10.0059C10.5229 10.0059 12.58 7.94779 12.58 5.40969C12.58 2.8716 10.5229 0.814453 7.98477 0.814453C5.44667 0.814453 3.38858 2.8716 3.38858 5.40969C3.38001 7.93922 5.42382 9.99731 7.95239 10.0059H7.98477Z"
          stroke="#686777"
          stroke-width="1.42857"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default UserIcon;
