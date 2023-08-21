import React from "react";
import { supabaseServiceRole } from "../database/supabaseClient.js";
import { Cloud } from "react-icon-cloud";
import { useState, useEffect } from 'react';

const MemberCloud = () => {
    const bucketName = 'profiles'
    const folderPath = 'dev/'
    const tagCanvasOptions = {
    // activateAudio: string
    // activeCursor: string 
    // altImage: boolean
    // animTiming: 'Smooth' | 'Linear'
    // audioIcon: boolean
    // audioIconDark: boolean
    // audioIconSize: number
    // audioIconThickness: number
    // audioVolume: number
    // bgColor: null | string
    // bgOutlineThickness: number
    // bgRadius: 1000,
    // centreFunc: any
    // centreImage: any
    // clickToFront: 500,
    // decel: number
        depth: 1,
    // dragControl: true,
    // dragThreshold: 100,
    // fadeIn: number
    // freezeActive: true,
    freezeDecel: true,
    // frontSelect: boolean
    // hideTags: false,
    // imageAlign: 'centre' | 'left' | 'right'
    imageMode: 'both',//null | 'image' | 'text' | 'both'
    // imagePadding: 10,
    imagePosition: 'top',//'top' | 'bottom' | 'left' | 'right'
    imageRadius: 100,//number | string
    imageScale: 2,
    // imageVAlign: 'top' | 'bottom' | 'middle'
    initial: [0.1, -0.1],
    // interval: number
    // lock: null | 'x' | 'y' | 'xy'
    // maxBrightness: number
    // maxSpeed: number
    // minBrightness: number
    // minSpeed: number
    // minTags: 0 - 200
    // noMouse: boolean
    // noSelect: boolean
    // noTagsMessage: string
    // offsetX: number
    // offsetY: number
    outlineColour: '#0000',
    // outlineDash: number
    // outlineDashSpace: number
    // outlineIncrease: number
    // outlineMethod: 'outline' | 'classic' | 'block' | 'colour' | 'size' | 'none'
    // outlineOffset: number
    // outlineRadius: number
    // outlineThickness: number
    padding: 0,
    // pinchZoom: boolean
    // pulsateTime: number
    // pulstateTo: number
    // radiusX: number
    // radiusY: number
    // radiusZ: number
    // repeatTagsTags: 0 - 64
        reverse: true,
    // scrollPause: boolean
    // shadow: string
    // shadowBlur: number
    // shadowOffset: [number,number] | number[]
    // shape: 'sphere' | 'hcylinder' | 'vcylinder' | 'hring' | 'vring'
    // shuffleTags: boolean
    // splitWidth: number
    // stretchX: number
    // stretchY: number
    // textAlign: 'centre' | 'left' | 'right'
    // textColour: string
    // textFont: string
    // textHeight: 25,
    // textVAlign: 'top' | 'bottom' | 'middle'
    tooltip: 'native', // null | 'div'
    // tooltipClass: string
    tooltipDelay: 0,
    // txtOpt: boolean
    // txtScale: number
    // weight: boolean
    // weightFrom: any
    // weightGradient: any
    // weightMode: 'size' | 'colour' | 'both' | 'bgcolour' | 'bgoutline' | 'outline'
    // weightSize: 10,
    // weightSizeMax: number | null
    // weightSizeMin: number | null
    wheelZoom: true,
    // zoom: 0,
    // zoomMax: 100,
    // zoomMin: 3,
    // zoomStep: 1,
    }

    const [imageListWithDesignations, setProfileImageList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFileList = async () => {
            try {
                const { data: imageList, error: listError } = await supabaseServiceRole.storage
                    .from(bucketName)
                    .list(folderPath);

                if (listError) {
                    console.error('Error fetching file list:', listError);
                } else {
                    // Fetch the corresponding designations for each image
                    const designations = await supabaseServiceRole
                      .from('member_profiles')
                      .select('name, designation, profile_image_id, link');

                    // Combine imageList and designations where the image id matches the profile_image_id
                    const imageListWithDesignations = imageList.map(file => {
                      const designation = designations.data.find(designation => designation.profile_image_id === file.id);

                      return {
                        ...file,
                        designation: designation.designation,
                        username: designation.name,
                        profile_link: designation.link
                      }
                    });
                    setProfileImageList(imageListWithDesignations);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFileList();
    }, [bucketName, folderPath]);

    const handleClick = (event, profileLink) => {
      // event.preventDefault();
      window.open(profileLink, '_blank');
    };

    // Get the bucket URL from the Supabase client config.
    const bucketUrl = supabaseServiceRole.storageUrl;

    // Get the number of images in the bucket.
    const numImages = imageListWithDesignations.length;

    // Calculate the size of each image based on the number of images
    const imageSize = "100px";

    const iconsDivs = imageListWithDesignations.map((file, index) => {
        return (
            <a key={index} title="This is a tool tip" tooltipDelay="1" onClick={(e) => handleClick(e, file.profile_link)}>
                <img
                src={`${bucketUrl}/object/public/${bucketName}/${folderPath}/${file.name}`}
                alt={`Image ${index}`}
                width={imageSize}
                height={imageSize}
                style={{ cursor: 'pointer' }}
                layout="fill"
                objectFit="cover"
                />
                <div>
                <p>
                {file.username}
                </p><br/>
                <p>
                {file.designation}
                </p>
                </div>
            </a>
        );
    });

    return (

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Cloud
                id={"icon"}
                minContrastRatio={1}
                iconSize={50}
                backgroundHexColor={"#fff"}
                fallbackHexColor={"#000"}
                options={tagCanvasOptions}
                containerProps={{
                    style: {
                        position: 'fixed', // Set to 'absolute' if needed
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden', // Ensure the canvas doesn't overflow the viewport
                    },
                }}
                canvasProps={{
                    style: {
                        width: '100%',
                        height: '100%',
                    },
                }}
            >
                {iconsDivs}
            </Cloud>
        </div>
    );
};

export default MemberCloud;