interface AvatarProps {
  name: string;
  bildUrl: string;
}

function Avatar({ name, bildUrl }: AvatarProps): React.JSX.Element {
  return (
    <div className="avatar">
      <img src={bildUrl} alt={name} />
      <p>{name}</p>
    </div>
  );
}

export default Avatar;
