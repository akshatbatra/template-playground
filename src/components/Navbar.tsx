import { useState } from "react";
import { Menu, Dropdown, Button, Image, Grid } from "antd";
import { useSpring } from "react-spring";
import { useLocation, Link } from "react-router-dom";
import {
  GithubOutlined,
  QuestionOutlined,
  UserOutlined,
  InfoOutlined,
  BookOutlined,
  CaretDownFilled,
  MenuOutlined
} from "@ant-design/icons";
import ToggleDarkMode from "./ToggleDarkMode";

const { useBreakpoint } = Grid;

interface NavbarProps {
  scrollToFooter: () => void;
}

function Navbar({ scrollToFooter }: NavbarProps) {
  const [hovered, setHovered] = useState<
    null | "home" | "explore" | "help" | "github" | "join"
  >(null);
  const screens = useBreakpoint();
  const location = useLocation();

  const props = useSpring({
    loop: true,
    from: { opacity: 0.5, boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)" },
    to: [
      { opacity: 1, boxShadow: "0px 0px 5px rgba(255, 255, 255, 1)" },
      { opacity: 0.9, boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)" },
    ],
    config: { duration: 1000 },
  });

  const mobileMenu = (
    <Menu>
      <Menu.Item key="home">
        <Link to="/">
          Template Playground
        </Link>
      </Menu.Item>
      <Menu.Item key="explore" onClick={scrollToFooter}>
        Explore
      </Menu.Item>
      <Menu.Item key="about">
        <a
          href="https://github.com/accordproject/template-playground/blob/main/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <QuestionOutlined /> About
        </a>
      </Menu.Item>
      <Menu.Item key="community">
        <a
          href="https://discord.com/invite/Zm99SKhhtA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UserOutlined /> Community
        </a>
      </Menu.Item>
      <Menu.Item key="issues">
        <a
          href="https://github.com/accordproject/template-playground/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InfoOutlined /> Issues
        </a>
      </Menu.Item>
      <Menu.Item key="documentation">
        <a
          href="https://github.com/accordproject/template-engine/blob/main/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BookOutlined /> Documentation
        </a>
      </Menu.Item>
    </Menu>
  );

  const helpMenu = (
    <Menu>
      <Menu.ItemGroup key="info" title="Info">
        <Menu.Item key="about">
          <a
            href="https://github.com/accordproject/template-playground/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <QuestionOutlined /> About
          </a>
        </Menu.Item>
        <Menu.Item key="community">
          <a
            href="https://discord.com/invite/Zm99SKhhtA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <UserOutlined /> Community
          </a>
        </Menu.Item>
        <Menu.Item key="issues">
          <a
            href="https://github.com/accordproject/template-playground/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InfoOutlined /> Issues
          </a>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Documentation">
        <Menu.Item key="documentation">
          <a
            href="https://github.com/accordproject/template-engine/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOutlined /> Documentation
          </a>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  const menuItemStyle = (key: string, isLast: boolean) => ({
    display: "flex",
    alignItems: "center",
    padding: screens.md ? "0 20px" : "0",
    backgroundColor:
      hovered === key ? "rgba(255, 255, 255, 0.1)" : "transparent",
    height: "65px",
    borderRight:
      screens.md && !isLast ? "1.5px solid rgba(255, 255, 255, 0.1)" : "none",
  });

  const isLearnPage = location.pathname.startsWith("/learn");

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#1b2540",
        height: "65px",
        lineHeight: "65px",
        display: "flex",
        alignItems: "center",
        paddingLeft: screens.lg ? 40 : screens.md ? 10 : 10,
        paddingRight: screens.lg ? 40 : screens.md ? 10 : 10,
      }}
    >
      <div
        style={{
          cursor: "pointer",
          ...menuItemStyle("home", false),
        }}
        onMouseEnter={() => setHovered("home")}
        onMouseLeave={() => setHovered(null)}
      >
        <Link
          to="/"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image
            src={screens.lg ? "/logo.png" : "/accord_logo.png"}
            alt="Template Playground"
            preview={false}
            style={{
              paddingRight: screens.md ? "8px" : "2px",
              height: "26px",
              maxWidth: screens.md ? "184.17px" : "36.67px",
            }}
          />
          <span style={{ color: "white", display: screens.lg ? "block" : "none" }}>Template Playground</span>

        </Link>
      </div>
      {screens.md ? (
        <>
          <div
            style={{
              ...menuItemStyle("explore", false),
              cursor: "pointer",
            }}
            onClick={scrollToFooter}
            onMouseEnter={() => setHovered("explore")}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={{ color: "white" }}>Explore</span>
          </div>
          <div
            style={{
              ...menuItemStyle("help", false),
              cursor: "pointer",
            }}
            onMouseEnter={() => setHovered("help")}
            onMouseLeave={() => setHovered(null)}
          >
            <Dropdown overlay={helpMenu} trigger={["click"]}>
              <Button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  height: "65px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Help
                <CaretDownFilled
                  style={{ fontSize: "10px", marginLeft: "5px" }}
                />
              </Button>
            </Dropdown>
          </div>
        </>
      ) : (
        <div style={{ marginLeft: "5px" }}>
          <Dropdown overlay={mobileMenu} trigger={["click"]}>
            <Button
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                height: "65px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MenuOutlined style={{ fontSize: "20px" }} />
            </Button>
          </Dropdown>
        </div>
      )}
      <div
        style={{
          display: "flex",
          marginLeft: "auto",
          alignItems: "center",
          height: "65px",
          gap: screens.md ? "20px" : "10px",
          marginRight: screens.md ? 0 : "5px"
        }}
      >
        <div style={{ marginLeft: screens.md ? 0 : "auto" }}>
          <ToggleDarkMode />
        </div>
        {!isLearnPage && (
          <div
            style={{
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: hovered === "join" ? "0 0 10px 10px rgba(255, 255, 255, 0.1)": "none", 
              cursor: "pointer",
              borderRadius: "5px"
            }}
            onMouseEnter={() => setHovered("join")}
            onMouseLeave={() => setHovered(null)}
          >
            <Link to="/learn/intro" className="learnNow-button">
              <button
                style={{
                  ...props,
                  padding: "10px 22px",
                  backgroundColor: "#19c6c7",
                  color: "#050c40",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                } as any}
              >
                Learn
              </button>
            </Link>
          </div>
        )}
        <div
          style={{
            height: "65px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: screens.md ? "0 20px" : "0 10px",
            borderRadius: "5px",
            borderLeft: screens.md
              ? "1.5px solid rgba(255, 255, 255, 0.1)"
              : "none",
            paddingLeft: screens.md ? 16 : 5,
            paddingRight: screens.md ? 16 : 5,
            backgroundColor:
              hovered === "github" ? "rgba(255, 255, 255, 0.1)" : "transparent",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHovered("github")}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href="https://github.com/accordproject/template-playground"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", color: "white" }}
          >
            <GithubOutlined
              style={{
                fontSize: "20px",
                color: "white",
                marginRight: screens.md ? "5px" : "0",
              }}
            />
            <span style={{ display: screens.md ? "inline" : "none" }}>Github</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;