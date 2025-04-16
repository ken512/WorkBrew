
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/app/admin/_components/Button";
import "@testing-library/jest-dom";

describe("Buttonコンポーネント", () => {
  test("ボタンがレンダリングされる", () => {
    render(<Button type="button">ボタン</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("childrenの内容が表示される", () => {
    render(<Button type="button">保存</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("保存");
  });

  test("onClickが呼び出される", () => {
    const handleClick = jest.fn();
    render(
      <Button type="button" onClick={handleClick}>
        送信
      </Button>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("variant='danger'で赤背景クラスが付与される", () => {
    render(<Button type="button">削除</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(
      "px-6 py-2 min-w-[80px] sm:text-sm rounded-3xl font-bold transition-colors duration-200 bg-beige-200 hover:bg-custom-green"
    );
  });

  test("disabledがtrueの場合、ボタンが無効になる", () => {
    render(
      <Button type="button" disabled>
        無効
      </Button>
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
