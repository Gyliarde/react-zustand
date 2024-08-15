import { useUserStore } from "./store/useUserStore";

function CountWithRedo() {
  const countWithRedo = useUserStore((state) => state.countWithRedo);

  console.log("render countWithRedo filter subscribe");

  return (
    <>
      <span> {countWithRedo} Com Controle de Crtl Z </span>
    </>
  );
}

export default CountWithRedo;
