import { ScissorOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.keyPath.reverse().join("/"), { state: { key: e.key } });
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        mode="horizontal"
        onClick={onClick}
        className="w-fit h-full bg-slate-50"
        selectedKeys={[current]}
        items={[
          { key: "", label: "Home" },
          { key: "about", label: "About" },
          { key: "project", label: "Project" },
          {
            key: "services",
            label: "Services",
            children: [
              {
                key: "รับงานปิดขอบ",
                label: "รับงานปิดขอบ",
                icon: <ScissorOutlined />,
              },
              { key: "service2", label: "เจาะข้าง" },
            ],
          },
          { key: "furniture", label: "Furniture" },
        ]}
      />
    </>
  );
};

export default NavBar;
