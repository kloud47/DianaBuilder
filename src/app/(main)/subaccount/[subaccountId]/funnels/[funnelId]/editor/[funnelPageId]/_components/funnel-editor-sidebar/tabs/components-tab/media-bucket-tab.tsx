"use client";
import MediaComponent from "@/components/media/MediaComponent";
import { getMedia } from "@/lib/queries";
import { GetMediaFiles } from "@/lib/types";
import React, { useEffect, useState } from "react";

type Props = {
  subaccountId: string;
};

const MediaBucketTab = ({ subaccountId }: Props) => {
  const [data, setData] = useState<GetMediaFiles>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMedia(subaccountId);
      setData(response);
    };
    fetchData();
  }, [subaccountId]);

  return (
    <div className="overflow-y-scroll p-4 StartScroll">
      <MediaComponent data={data} subaccountId={subaccountId} />
    </div>
  );
};

export default MediaBucketTab;
