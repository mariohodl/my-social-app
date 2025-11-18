'use client'

import React, {useState, useEffect } from 'react'
import { getTimelinePageData, TimelinePageData } from './getPageData';
import { useSocialStore } from '@/utils/appStore';


function TimelinePage() {
  const [data, setData] = useState<TimelinePageData | null>(null);
  const { setPosts, posts } = useSocialStore();

  useEffect(() => {
    async function loadData() {
      const pageData = await getTimelinePageData();
      setData(pageData);
      setPosts(pageData.posts);
      console.log({pageData})

    }
    loadData();
  }, [setPosts]);
  return (
    <div>{'timeline'}</div>
  )
}

export default TimelinePage