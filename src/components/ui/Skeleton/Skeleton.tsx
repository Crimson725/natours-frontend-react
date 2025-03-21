import "./Skeleton.css";

interface SkeletonProps {
  height: string;
  customStyles?: React.CSSProperties;
  totalSkeletons?: number;
}

const Skeleton = (props: SkeletonProps) => {
  const { height, customStyles, totalSkeletons = 1 } = props;

  const totalSkeletonsArray = new Array(totalSkeletons).fill(1);

  const styles = { ...customStyles, height };

  return (
    <>
      {totalSkeletonsArray.map((el, index) => (
        <div className="skeleton" style={styles} key={index}></div>
      ))}
    </>
  );
};

export default Skeleton;
