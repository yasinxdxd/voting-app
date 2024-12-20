import React, { useState, useRef } from "react";
import Turkey from "@react-map/turkey";

export const Home = () => {
    const selectedStateRef = useRef(null);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <Turkey
                type="select-single"
                onSelect={(state) => {
                    selectedStateRef.current = state;
                    console.log(selectedStateRef.current);
                }}
                hints={true}
            />
        </div>
    );
}
