/**
 * Sidebar.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import SidebarLink from './SidebarLink';

const propTypes = {
    active: PropTypes.string,
    pageName: PropTypes.string,
    sections: PropTypes.array,
    jumpToSection: PropTypes.func,
    stickyHeaderHeight: PropTypes.number,
    contentHeight: PropTypes.number
};

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldFloat: false,
            sidebarWidth: 0,
            floatPoint: 0,
            reachedBottom: false
        };

        this.lastY = null;
        this.windowDidScroll = throttle(this.windowDidScroll.bind(this), 16);
        this.measureSidebarWidth = this.measureSidebarWidth.bind(this);
    }

    componentDidMount() {
        this.measureSidebarWidth();
        window.addEventListener('scroll', this.windowDidScroll);
        window.addEventListener('resize', this.measureSidebarWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.windowDidScroll);
        window.removeEventListener('resize', this.measureSidebarWidth);
    }

    measureSidebarWidth() {
        // measure the reference div
        let targetElement = this.referenceDiv;
        if (!this.state.shouldFloat) {
            // sidebar isn't floating, so measure that instead
            targetElement = this.div;
        }

        const width = targetElement.offsetWidth;
        // also measure the Y position at which to float the sidebar
        // Subtract the height of the absolutely-positioned sticky header
        const floatPoint = targetElement.offsetTop - 30 - this.props.stickyHeaderHeight;

        this.setState({
            floatPoint,
            sidebarWidth: width
        }, () => {
            if (this.state.shouldFloat) {
                // when the sidebar floats it calls outside of the grid layout, so
                // programmatically force it to the correct width
                this.div.style.width = `${width}px`;
            }
            else {
                this.div.style.width = 'auto';
            }
        });
    }

    windowDidScroll() {
        // check where the sidebar is in the viewport
        if (!this.div || !this.referenceDiv) {
            // the DOM element is missing!
            return;
        }

        let shouldFloat = false;
        const yPos = window.scrollY || window.pageYOffset;
        if (yPos > this.state.floatPoint) {
            // it needs to float because the sidebar is less than 60px from the top or out of view
            shouldFloat = true;
        }

        if (shouldFloat !== this.state.shouldFloat) {
            this.setState({
                shouldFloat
            }, () => {
                if (shouldFloat) {
                    // when the sidebar floats it calls outside of the grid layout, so
                    // programmatically force it to the correct width
                    this.div.style.width = `${this.state.sidebarWidth}px`;
                }
            });
        }

        const siteHeaderHeight = 97;
        const totalHeight = this.props.contentHeight + this.props.stickyHeaderHeight + siteHeaderHeight + 30;
        const distFromBottom = totalHeight - yPos - this.div.clientHeight;

        if (distFromBottom < 0 && !this.state.reachedBottom) {
            this.setState({
                reachedBottom: true
            });
            this.div.style.margin = `${yPos}px 0 0 0`;
        }
        else if (distFromBottom >= 0 && this.state.reachedBottom) {
            this.setState({
                reachedBottom: false
            });
            this.div.style.margin = `auto`;
        }
    }

    render() {
        const items = this.props.sections.map((section) => {
            let link = (
                <SidebarLink
                    section={section.section}
                    label={section.label}
                    active={this.props.active}
                    onClick={this.props.jumpToSection} />
            );
            if (section.url) {
                const active = this.props.active === section.section ? 'active' : '';
                link = (
                    <a
                        className={`sidebar-link ${active}`}
                        href={section.url}>
                        {section.label}
                    </a>
                );
            }
            return (
                <li key={section.section}>
                    {link}
                </li>
            );
        });

        let floatSidebar = '';
        if (this.state.shouldFloat) {
            floatSidebar = 'float-sidebar';
        }
        if (this.state.reachedBottom) {
            floatSidebar = 'reached-bottom';
        }

        return (
            <div>
                <div
                    className={`${this.props.pageName}-sidebar-reference ${floatSidebar}`}
                    ref={(div) => {
                        // this is an empty div that does not float with the page so we can track
                        // the inline/non-floating Y position of the sidebar
                        this.referenceDiv = div;
                    }}>
                    &nbsp;
                </div>
                <div
                    className={`${this.props.pageName}-sidebar-content ${floatSidebar}`}
                    ref={(div) => {
                        this.div = div;
                    }}>
                    <ul>
                        { items }
                    </ul>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = propTypes;
