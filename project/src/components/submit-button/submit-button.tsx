interface SubmitButtonProps {
  onModalClick: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
}

function SubmitButton({ onModalClick }: SubmitButtonProps): JSX.Element {
    return (
      <a onClick={onModalClick} className="button button--red-border button--big reviews__sumbit-button" href="/">
        Оставить отзыв
      </a>
    );
  }
  
export default SubmitButton;