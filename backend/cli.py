"""Modman CLI"""
import argparse


def parse_arguments():
    """Parse commandline arguments"""
    parser = argparse.ArgumentParser(usage="%(prog)s", description="Manage installed L4D2 mods",
                                     epilog="Repo : https://github.com/pukmajster/l4d2-modman")
    parser.add_argument('-b', '--build', help='generate mod cache')
    return parser.parse_args()


def main():
    """Start here"""
    args = parse_arguments()

    if args.build:
        print("building cache")
    

    