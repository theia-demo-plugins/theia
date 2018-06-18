/*
 * Copyright (C) 2018 Red Hat, Inc. and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { WorkspaceExt, MAIN_RPC_CONTEXT } from "../../api/plugin-api";
import { RPCProtocol } from "../../api/rpc-protocol";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import { FileStat } from '@theia/filesystem/lib/common';
import Uri from 'vscode-uri';
import { WorkspaceFoldersChangeEvent } from "@theia/plugin";

export class WorkspaceMain {

    private proxy: WorkspaceExt;

    private workspaceRoot: Uri | undefined;

    constructor(rpc: RPCProtocol, workspaceService: WorkspaceService) {
        this.proxy = rpc.getProxy(MAIN_RPC_CONTEXT.WORKSPACE_EXT);

        console.log(">> CREATING WORKSPACE MAIN");

        workspaceService.root.then((root) => {
            console.log("<< ROOT FOLDER CHANGED ", root);
            if (root) {
                const stat: FileStat = root as FileStat;
                console.log(">> stat " + stat.uri);

                this.workspaceRoot = Uri.parse(root.uri);
                console.log(">> uri >> ", this.workspaceRoot);
            } else {
                this.workspaceRoot = undefined;
            }

            this.proxy.$onWorkspaceFoldersChanged({} as WorkspaceFoldersChangeEvent);
        });
    }

}
