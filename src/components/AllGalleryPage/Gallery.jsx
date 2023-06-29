import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import GalleryImage from "./GalleryImage";
import Tab from "./Tab";
import axios from "axios";
import { API } from "../../global/Constants";
import { useSelector } from "react-redux";

function Gallery(props) {
  const user = useSelector((state) => state.user);
  const [workList, setWorkList] = useState([]);

  const StyledImageList = styled.div`
    width: ${props.showTab ? "45%" : "60%"};
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin: ${props.showTab ? "30px 30px 0 30px" : "30px auto"};
  `;

  useEffect(() => {
    axios
      .get(API + "/allworklist", {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then((response) => {
        setWorkList(response.data.work_list);
      })
      .catch((err) => console.log(err));
  }, []);

  if (workList.length === 0)
    return (
      <div
        style={{ textAlign: "center", fontSize: "24px", marginTop: "200px" }}
      >
        데이터가 없습니다.
      </div>
    );

  return (
    <>
      <StyledImageList>
        {workList.map((item) => (
          <GalleryImage
            key={item.work_id}
            data={item}
            showTab={props.showTab}
            setShowTab={props.setShowTab}
            detailInfo={props.detailInfo}
            setDetailInfo={props.setDetailInfo}
          />
        ))}
      </StyledImageList>
      <Tab
        showTab={props.showTab}
        setShowTab={props.setShowTab}
        detailInfo={props.detailInfo}
        setDetailInfo={props.setDetailInfo}
      />
    </>
  );
}

export default Gallery;
