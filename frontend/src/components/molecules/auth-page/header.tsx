type Props = {
  title: string;
  description: string;
};

export const AuthPageHeader = ({ title, description }: Props) => (
  <div className="grid gap-2 text-center">
    <h1 className="text-3xl font-bold">{title}</h1>
    <p className="text-balance text-muted-foreground">{description}</p>
  </div>
);
