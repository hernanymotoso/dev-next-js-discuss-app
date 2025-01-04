import { Input } from '@nextui-org/input';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from '@nextui-org/navbar';
import Link from "next/link";
import HeaderAuth from "./header-auth";

export default function Header() {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link className="font-bold" href="/">Discuss</Link>
            </NavbarBrand>

            <NavbarContent justify="center">
                <NavbarItem>
                    <Input />
                </NavbarItem>
            </NavbarContent>
            
            <NavbarContent justify="end">
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    )
}                        