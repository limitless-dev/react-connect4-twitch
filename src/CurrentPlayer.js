import "./CurrentPlayer.css";
export default function CurrentPlayer({player}) {
  return (
    <section className="container">
      <h2 className="title">
        <span>Now</span>
        <span>{player}</span>
      </h2>
    </section>
  );
}
