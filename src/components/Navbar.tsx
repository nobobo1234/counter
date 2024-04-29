import RouterLink from "next/link";
import React, { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/creategroup", label: "About" },
    ]
