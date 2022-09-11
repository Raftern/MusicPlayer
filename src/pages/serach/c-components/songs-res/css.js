import styled from "@emotion/styled";
import { ThemeColor } from "../../../../common/css-var";

export const MioSearchSongDiv = styled.div`
  .number-title {
    margin-top: 20px;
    margin-left: 20px;
  }

  .song-list-item-top {
    margin-top: 20px;
  }

  .arco-pagination {
    margin: 20px 0;    
    .arco-pagination-list {
      margin: auto;
      .arco-pagination-item {
        color: #878787;
        border: 1px solid #414141;
        :hover {
          background-color: #414141;
        }
      }
      .arco-pagination-item-active {
        color: #ffffff;
        background-color: #ec4141;
        :hover {
          background-color: #ec4141;
        }
      }
    }
  }

  .loading {
    text-align: center;
    line-height: 50px;
    height: 50px;
  }
`