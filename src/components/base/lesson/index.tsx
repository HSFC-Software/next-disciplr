type LessonProps = {
  code: "L1" | "L2" | "L3" | "L4" | "L5" | "L6" | "L7" | "L8" | "L9" | "L10";
  name: string;
};

const Lesson = (props: LessonProps) => {
  return <span className={`${props.code} badge`}>{props.name}</span>;
};

export default Lesson;
