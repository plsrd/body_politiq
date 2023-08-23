import { Flex } from "@sanity/ui"
import React from "react"
import YouTubePlayer from "react-youtube"

export const YoutubePreview = (props, context) => {
  console.log(props, context)
  return <>
    <Flex direction='column'>
      {props.renderDefault(props)}
      <YouTubePlayer
        videoId={props.value}
      />
    </Flex>
  </>
}
