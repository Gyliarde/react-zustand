import { useUserStore } from "./store/useUserStore";

function CountWithoutRedo() {
  const countWithoutRedo = useUserStore((state) => state.countWithoutRedo);

  console.log("render countWithoutRedo filter subscribe");

  return (
    <>
      <span> {countWithoutRedo} Sem Controle de Crtl Z </span>
    </>
  );
}

export default CountWithoutRedo;
